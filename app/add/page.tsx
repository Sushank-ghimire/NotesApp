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
import { useUserDataContext } from "@/context/UserDataProvider";
import { useRouter } from "next/navigation";

const AddNotes = () => {
  const noteSchema = z.object({
    title: z.string(),
    description: z.string(),
  });

  const router = useRouter();

  const { userData } = useUserDataContext();

  const form = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
  });

  async function onSubmit(values: z.infer<typeof noteSchema>) {
    const { title, description } = values;
    try {
      const response = await fetch(
        `/api/addnotes?email=${userData.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
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
      <h1 className="text-center text-xl font-bold">Add Notes</h1>
      <div className="w-full flex flex-col gap-4 text-xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 text-lg md:text-xl"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      required
                      placeholder="Enter the title..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      rows={5}
                      required
                      placeholder="Enter the description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full mx-auto" type="submit">
              Add Note
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddNotes;
