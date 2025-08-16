<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {Pencil} from "lucide-vue-next";
import {computed, ref, watch} from "vue";
import HomeCategoriesDialogEdit from "@/components/home/HomeCategories/HomeCategoriesDialogEdit.vue";
import HomeCategoriesDialogAdd from "@/components/home/HomeCategories/HomeCategoriesDialogAdd.vue";
import {Label} from "@/components/ui/label";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

const showTimeError = ref<boolean>(false);
const showCategoryError = ref<boolean>(false);
const disableSaveButton = ref<boolean>(false);
const timeError = ref<string>('More than 24 hours a day');
const categoryError = ref<string>('Category name is too long');
const anyError = computed(() => showTimeError.value || showCategoryError.value || disableSaveButton.value);
const editDialogRef = ref();
const addDialogRef = ref();
const activeTab = ref('edit'); // default-Wert

function saveChanges() {
  if (editDialogRef.value) {
    editDialogRef.value.saveChanges();
  } else if (addDialogRef.value) {
    addDialogRef.value.saveChanges();
  }
}

function cancelErrors() {
  showTimeError.value = false;
  showCategoryError.value = false;
}

watch(activeTab, () => {
  disableSaveButton.value = false;
});
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button class="w-[40px]" variant="ghost">
              <Pencil/>
            </Button>
          </TooltipTrigger>
          <TooltipContent >
            <p>Edit Mode</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </DialogTrigger>
    <DialogContent class="h-[700px]">
      <DialogHeader>
        <DialogTitle>Edit</DialogTitle>
        <DialogDescription>
          Edit your spend time or change the categories.
        </DialogDescription>
      </DialogHeader>
      <div>
        <Tabs v-model="activeTab">
          <div class="flex items-center mb-4">
            <TabsList >
              <TabsTrigger value="edit">
                Edit Time
              </TabsTrigger>
              <TabsTrigger value="change">
                Change Categories
              </TabsTrigger>
            </TabsList>
            <Label v-if="showTimeError" class="ml-4 text-red-500">{{ timeError }}</Label>
            <Label v-if="showCategoryError" class="ml-4 text-red-500">{{ categoryError }}</Label>
          </div>
          <TabsContent value="edit">
            <HomeCategoriesDialogEdit @toMuchTime="(show:boolean) => showTimeError = show" ref="editDialogRef"
                                      @opened="cancelErrors"
                                      @move-to-add-category="activeTab = 'change'"
            />
          </TabsContent>
          <TabsContent value="change">
            <HomeCategoriesDialogAdd @error="(show:boolean) => showCategoryError = show"
                                     @errorMessage="(message:string) => categoryError = message"
                                     @editMode="(show:boolean) => disableSaveButton = show"
                                     @opened="cancelErrors"
                                     ref="addDialogRef"/>
          </TabsContent>
        </Tabs>
      </div>
      <DialogFooter >
        <DialogClose>
          <Button variant="destructive" @click="cancelErrors">
            Cancel
          </Button>
        </DialogClose>
        <DialogClose>
          <Button :disabled="anyError" @click="saveChanges">
            Save changes
          </Button>
          <p>{{ anyError }}</p>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>