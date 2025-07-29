<script setup lang="ts">
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useStore} from "@/store/store.ts";
import {Plus, Pencil, Trash, Check} from "lucide-vue-next";
import {computed, onMounted, ref, watch} from "vue";
import useApi from "@/lib/api.ts";

interface FormattedCategory {
  id: number,
  name: string,
  color: string,
  showInputEl: boolean,
  edited: boolean,
  deleted: boolean
}

const store = useStore();
const categories = ref<FormattedCategory[]>([]);
const deletedCategoriesIds = ref<number>([]);
const api = useApi()

const emit = defineEmits(['error', 'errorMessage', 'editMode'])

const categoryInEditMode = computed(() => {
  return categories.value.some(category => category.showInputEl);
})
watch(categoryInEditMode, (value) => {
  emit('editMode', value);
})

function verifyInput(category: FormattedCategory) {
  if (category.name.length > 20) {
    emit('error', true);
    emit('errorMessage', 'Category name is too long');
  } else {
    emit('error', false);
  }
  category.edited = true;
}
function toggleInputEl(category: FormattedCategory) {
  category.showInputEl = !category.showInputEl;
   // TODO: Edited logic
}

async function saveChanges() {
  const updated = categories.value.filter(cat => cat.edited && !cat.deleted);
  const update_call = api.updateCategories(updated.map(cat => ({
    id: cat.id,
    name: cat.name,
    color: cat.color
  })));

  const delete_call = api.setCategoriesDeleted(deletedCategoriesIds.value);

  const added = categories.value.filter(cat => cat.id == null);
  const add_call = api.addCategories(added.map(cat => ({
    name: cat.name,
    color: cat.color
  })));

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

  getCategories();
}

function addCategory() {
  console.log('addCategory');
  categories.value.unshift({
    id: null,
    name: 'New Category',
    color: '#000000',
    showInputEl: true,
    edited: false,
    deleted: false
  });
}
function deleteCategory(category: FormattedCategory) {
  categories.value = categories.value.filter(cat => cat.id !== category.id)
  deletedCategoriesIds.value.push(category.id);
  console.log('category zum löschen makiert ', category.name);
}

defineExpose({
  saveChanges
})

function getCategories() {
  categories.value = store.categories.map(category => ({
    id: category.id,
    name: category.name,
    color: category.color,
    showInputEl: false,
    edited: false,
    deleted: false
  }));
}
onMounted(() => {
  getCategories();
});
</script>

<template>
  <ScrollArea class="h-[396px]">
    <div v-for="category in categories" :key="category.id"
         class="flex justify-between gap-4 pt-3 mr-3 hover-container">
      <div class="flex items-center w-full" >
        <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: category.color }"></div>
        <Input class="ml-3 w-full"
               v-if="category.showInputEl"
               v-model="category.name"
               @keydown.enter="toggleInputEl(category)"
               @input="verifyInput(category)"/>
        <p v-else class="ml-3 w-full" @click="toggleInputEl(category)" @blur="toggleInputEl(category)">
          {{ category.name }}
        </p>
      </div>
      <div class="flex gap-3" v-if="category.showInputEl">
        <Button class="w-[40px]" variant="default" @click="toggleInputEl(category)" :disabled="category.name.length > 20">
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
  </ScrollArea>
  <div class="mt-3">
    <Button class="w-full" variant="outline" @click="addCategory">
      <Plus/> Add new Category
    </Button>
  </div>
</template>