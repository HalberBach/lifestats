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
import {computed, ref} from "vue";
import HomeCategoriesDialogEdit from "@/components/home/HomeCategories/HomeCategoriesDialogEdit.vue";
import HomeCategoriesDialogAdd from "@/components/home/HomeCategories/HomeCategoriesDialogAdd.vue";
import {Label} from "@/components/ui/label";

const showTimeError = ref(false);
const timeError = ref<string>('More than 24 hours a day');
const anyError = computed(() => showTimeError.value);
const editDialogRef = ref();
const addDialogRef = ref();

function saveChanges() {
  if (editDialogRef.value) {
    editDialogRef.value.saveChanges();
  } else if (addDialogRef.value) {
    //TODO:
  }
}
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button class="w-[40px]" variant="ghost">
        <Pencil/>
      </Button>
    </DialogTrigger>
    <DialogContent >
      <DialogHeader>
        <DialogTitle>Edit</DialogTitle>
        <DialogDescription>
          Edit your spend time or change the categories.
        </DialogDescription>
      </DialogHeader>
      <div>
        <Tabs default-value="edit" >
          <div class="flex items-center ">
            <TabsList>
              <TabsTrigger value="edit">
                Edit Time
              </TabsTrigger>
              <TabsTrigger value="change">
                Change Categories
              </TabsTrigger>
            </TabsList>
            <Label v-if="showTimeError" class="ml-4 text-red-500">{{ timeError }}</Label>
          </div>
          <TabsContent value="edit">
            <HomeCategoriesDialogEdit @toMuchTime="(show:boolean) => showTimeError = show" ref="editDialogRef"/>
          </TabsContent>
          <TabsContent value="change" >
            <HomeCategoriesDialogAdd />
          </TabsContent>
        </Tabs>
      </div>
      <DialogFooter class="mt-6">
        <DialogClose>
          <Button variant="destructive">
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
</template>

<style scoped>

</style>