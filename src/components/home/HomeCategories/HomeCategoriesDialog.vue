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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {Pencil} from "lucide-vue-next";
import {computed, ref, watch} from "vue";
import HomeCategoriesDialogEdit from "@/components/home/HomeCategories/HomeCategoriesDialogEdit.vue";
import HomeCategoriesDialogAdd from "@/components/home/HomeCategories/HomeCategoriesDialogAdd.vue";
import {Label} from "@/components/ui/label";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {createReusableTemplate, useMediaQuery} from "@vueuse/core";

const showTimeError = ref<boolean>(false);
const showCategoryError = ref<boolean>(false);
const disableSaveButton = ref<boolean>(false);
const timeError = ref<string>('More than 24 hours a day');
const categoryError = ref<string>('Category name is too long');
const anyError = computed(() => showTimeError.value || showCategoryError.value || disableSaveButton.value);
const editDialogRef = ref();
const addDialogRef = ref();
const activeTab = ref('edit'); // default-Wert

const [UseTemplate, GridForm] = createReusableTemplate()
const isDesktop = useMediaQuery("(min-width: 768px)")
const isOpen = ref(false)

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
  <!-- Template -->
  <UseTemplate>
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
        <div class="px-4 md:px-0">
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
        </div>
      </Tabs>
    </div>
  </UseTemplate>
  <!-- ----------------------------- -->

  <Dialog v-if="isDesktop" v-model:open="isOpen">
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
          Edit your spend time or add new categories.
        </DialogDescription>
      </DialogHeader>
      <GridForm />
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
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <Drawer v-else v-model:open="isOpen">
    <DrawerTrigger as-child>
      <Button class="w-[40px]" variant="ghost">
        <Pencil/>
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader class="text-left">
        <DrawerTitle>Edit</DrawerTitle>
        <DrawerDescription>
          Edit your spend time or add new categories.
        </DrawerDescription>
      </DrawerHeader>
      <GridForm />
      <DrawerFooter class="pt-2">
        <DrawerClose as-child>
          <Button variant="destructive" @click="cancelErrors">
            Cancel
          </Button>
        </DrawerClose>
        <DrawerClose as-child>
          <Button :disabled="anyError" @click="saveChanges">
            Save changes
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>