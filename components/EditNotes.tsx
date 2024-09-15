"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { NoteTypes } from "@/types/Note.types";
import { useUserDataContext } from "@/context/UserDataProvider";

const AddNotes = ({ note }: { note: NoteTypes }) => {
  const { userData } = useUserDataContext();

  const noteSchema = z.object({
    editedTitle: z.string(),
    editedDescription: z.string(),
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      editedTitle: note.title || "",
      editedDescription: note.description || "",
    },
  });

  async function onSubmit(values: z.infer<typeof noteSchema>) {
    const { editedTitle, editedDescription } = values;
    console.log("Edited values : ", values);
    try {
      const response = await fetch(
        `/api/editnotes?email=${userData.email}&id=${note._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            editedTitle: editedTitle,
            editedDescription: editedDescription,
          }),
        }
      );

      const data = await response.json();
      alert(await data.message);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <div className="w-[90vw] md:w-[80vw] mx-auto flex gap-4 flex-col">
      <h1 className="text-center text-xl font-bold">Update Notes</h1>
      <div className="w-full flex flex-col gap-4 text-xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 text-lg md:text-xl"
          >
            <FormField
              control={form.control}
              name="editedTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Update Title</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      required
                      placeholder="Edit the title..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="editedDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Update Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      rows={5}
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full mx-auto" type="submit">
              Update Note
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddNotes;
