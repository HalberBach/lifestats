<script setup lang="ts">
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useStore} from "@/store/store.ts";
import {Plus, Pencil, Trash, Check} from "lucide-vue-next";
import {computed, onMounted, ref, watch} from "vue";
import useApi from "@/lib/api.ts";
import ColorPickerDrawer from "@/components/ColorPickerDrawer.vue";

interface FormattedCategory {
  id: number | null, // null for new categories
  name: string,
  color: string,
  showInputEl: boolean,
  showColorPicker: boolean,
  newCategory: boolean,
  edited: boolean,
  deleted: boolean
}

const store = useStore();
const categories = ref<FormattedCategory[]>([]);
const deletedCategoriesIds = ref<number>([]);
const api = useApi()

const emit = defineEmits(['error', 'errorMessage', 'editMode','opened'])

const categoryInEditMode = computed(() => {
  return categories.value.some(category => category.showInputEl || category.showColorPicker);
})
watch(categoryInEditMode, (value) => {
  emit('editMode', value);
})

function verifyInput(category: FormattedCategory) {
  if (category.name.length > 20) {
    emit('error', true);
    emit('errorMessage', 'Category name is too long');
  } else if (category.name.length === 0) {
    emit('error', true);
    emit('errorMessage', 'Category name cannot be empty');
  } else if (categories.value.some(cat => cat.name === category.name && cat.id !== category.id)) {
    emit('error', true);
    emit('errorMessage', 'Category name already exists');
  } else {
    emit('error', false);
  }
  category.edited = true;
}
function toggleInputEl(category: FormattedCategory) {
  //emit('error', false);
  category.showInputEl = !category.showInputEl;
   // TODO: Edited logic
}
function toggleColorPicker(category: FormattedCategory) {
  category.showColorPicker = !category.showColorPicker;
}
function selectColor(category: FormattedCategory, newColor: string) {
  category.showColorPicker = false;
  if (category.color !== newColor) {
    category.color = newColor;
    category.edited = true;
  }
}

async function saveChanges() {
  emit('error', false);

  const updated = categories.value.filter(cat => cat.edited && !cat.deleted && !cat.newCategory);
  let update_call = Promise.resolve({ error: false });
  if (updated.length > 0) {
    update_call = api.updateCategories(updated.map(cat => ({
      id: cat.id,
      name: cat.name,
      color: cat.color
    })));
  }

  let delete_call = Promise.resolve({ error: false });
  if (deletedCategoriesIds.value.length > 0) {
    delete_call = api.fullyDeleteCategories(deletedCategoriesIds.value);
  }

  const added = categories.value.filter(cat => cat.newCategory);
  let add_call = Promise.resolve({ error: false });
  if (added.length > 0) {
    add_call = api.addCategories(added.map(cat => ({
      name: cat.name,
      color: cat.color
    })));
  }

  const [updateResponse, deleteResponse, addResponse] = await Promise.all([update_call, delete_call, add_call]);

  if (updateResponse.error) {
    console.log('Error updating categories:');
  }
  if (deleteResponse.error) {
    console.log('Error deleting categories:');
  }
  if (addResponse.error) {
    console.log('Error adding categories:');
  }

  if (updated.length > 0 || deletedCategoriesIds.value.length > 0 || added.length > 0) {
    await getCategories();
    await Promise.all([
      store.refreshSummaryStatistics(),
      store.setCategoryEntriesForDate(store.currentDate)
    ]);
  }
}

function addCategory() {
  if (categories.value.length >= 20) {
    emit('error', true);
    emit('errorMessage', 'You can only have a maximum of 20 categories');
  } else {
    emit('error', false);
    for (const element of store.colorPickerColors) {
      if (!categories.value.some(cat => cat.color === element)) {
        const ids = categories.value.map(c => c.id).filter(id => id !== null);
        const minId = ids.length > 0 ? Math.min(...ids) : 0;
        categories.value.unshift({
          id: minId - 1, // Use a negative ID for new categories
          name: 'New Category',
          color: element,
          showInputEl: true,
          showColorPicker: false,
          newCategory: true,
          edited: false,
          deleted: false
        });
        return;
      }
    }
  }
}


function deleteCategory(category: FormattedCategory) {
  categories.value = categories.value.filter(cat => cat.id !== category.id);
  category.deleted = true;
  if (!category.newCategory) {
    deletedCategoriesIds.value.push(category.id);
  }
}

defineExpose({
  saveChanges
})

function getCategories() {
  store.setCategories();
  categories.value = store.categories.map(category => ({
    id: category.id,
    name: category.name,
    color: category.color,
    showInputEl: false,
    showColorPicker: false,
    newCategory: false,
    edited: false,
    deleted: false
  })).sort((a, b) => a.name.localeCompare(b.name));
}
onMounted(() => {
  emit('opened', true);
  getCategories();
});
</script>

<template>
  <ScrollArea class="h-[396px]">
    <div v-for="category in categories" :key="category.id"
         class="flex flex-col justify-between pt-3 hover-container">
      <div class="flex w-full gap-4 pr-2">
        <div class="flex items-center w-full">
          <div
              class="md:w-4 md:h-4 w-5 h-5 rounded-sm cursor-pointer
              md:hover:border md:hover:border-gray-300 md:hover:p-3"
              :style="{ backgroundColor: category.color }"
              @click="toggleColorPicker(category)"></div>
          <Input class="ml-3 w-full"
                 v-if="category.showInputEl"
                 v-model="category.name"
                 @input="verifyInput(category)"/>
          <p v-else class="ml-3 w-full" @click="toggleInputEl(category)" @blur="toggleInputEl(category)">
            {{ category.name }}
          </p>
        </div>
        <div class="flex gap-3" v-if="category.showInputEl">
          <Button class="w-[40px]"
                  variant="default"
                  @click="toggleInputEl(category)"
                  :disabled="category.name.length > 20 ||
                  category.name.length === 0 ||
                 categories.some(cat => cat.name === category.name && cat.id !== category.id)">
            <Check />
          </Button>
          <Button class="w-[40px]" variant="ghost" disabled></Button>
        </div>
        <div class="flex gap-3" v-else>
          <Button class="w-[40px]" variant="secondary" @click="toggleInputEl(category)">
            <Pencil/>
          </Button>
          <Button class="w-[40px]" variant="destructive" @click="deleteCategory(category)">
            <Trash/>
          </Button>
        </div>
      </div>
      <ColorPickerDrawer
          v-if="category.showColorPicker"
          @color-selected="(newColor) => selectColor(category, newColor)"/>
    </div>
  </ScrollArea>
  <div class="mt-3">
    <Button class="w-full" variant="outline" @click="addCategory">
      <Plus/> Add new Category
    </Button>
  </div>
</template>