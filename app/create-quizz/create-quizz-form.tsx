"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { createInitialQuizz } from "../actions/quizz-actions";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB in bytes
const categories = [
  "light",
  "dark",
  "mixed",
  "history",
  "science",
  "math",
  "geography",
  "sports",
  "music",
  "movies",
  "literature",
  "art",
];
export const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  category: z
    .string()
    .min(2, { message: "Category must be at least 2 characters" }),
  difficulty: z
    .string()
    .min(2, { message: "Difficulty must be at least 2 characters" }),
  picture: z
    .instanceof(File, { message: "Picture is required" })
    .refine(
      (file) =>
        file &&
        file instanceof File &&
        ACCEPTED_IMAGE_TYPES.includes(file.type),
      {
        message:
          "Picture is required and must be a .png, .jpg, .jpeg, or .webp file",
      }
    )
    .refine((file) => file && file.size <= MAX_FILE_SIZE, {
      message: `Picture size should not exceed ${
        MAX_FILE_SIZE / (1024 * 1024)
      } MB.`,
    }),
});

export type CreateInitialQuizzFormValuesType = z.infer<typeof formSchema>;
export default function CreateQuizzForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      difficulty: "",
      picture: new File([], ""),
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await fetch("/api/create-quizz", {
      method: "POST",
      body: JSON.parse(JSON.stringify(values)),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* TITLE */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="min-w-fit max-w-[250px] mx-auto flex flex-col  justify-center items-center">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your title here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* END TITLE */}
        {/* PICTURE */}

        <FormField
          control={form.control}
          name="picture"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <>
              <FormItem className="flex flex-col gap-4 items-center justify-center">
                <FormLabel className="uppercase">Picture</FormLabel>
                <FormLabel className="group cursor-pointer">
                  <div className="relative w-[300px] h-[200px] mx-auto flex items-center justify-center">
                    <AspectRatio
                      ratio={300 / 200}
                      className="rounded-lg overflow-hidden"
                    >
                      <Image
                        src={
                          form.watch("picture") &&
                          form.watch("picture")?.type.startsWith("image")
                            ? URL.createObjectURL(form.watch("picture"))
                            : "/logo.png"
                        }
                        alt="quizz picture"
                        className="object-cover rounded-lg group-hover:opacity-40 transition-opacity duration-300"
                        fill
                      />
                    </AspectRatio>

                    <span className="hidden group-hover:flex absolute font-semibold text-xl uppercase">
                      {value ? "Change the picture" : "Upload a picture"}
                    </span>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/jpeg, image/png, image/jpg, image/webp"
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0];
                      onChange(file);
                    }}
                    {...fieldProps}
                    className="w-fit"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            </>
          )}
        />

        {/* END PICTURE */}
        {/* DESCRIPTION */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="max-w-[800px] mx-auto flex flex-col  justify-center items-center">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about your quizz..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* END DESCRIPTION */}
        {/* CATEGORY */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col w-fit mx-auto items-center ">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("w-[200px] justify-between")}
                    >
                      {field.value
                        ? categories.find(
                            (category) => category === field.value
                          )
                        : "Select category"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" side="top">
                  <Command>
                    <CommandInput placeholder="Search a category..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            value={category}
                            key={category}
                            onSelect={() => {
                              form.setValue("category", category);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                category === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {category}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* END CATEGORY */}
        {/* DIFFICULTY */}
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem className="max-w-[800px] mx-auto flex flex-col  justify-center items-center">
              <FormLabel>Difficulty</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={(e) => form.setValue("difficulty", e)}
                >
                  {["easy", "medium", "hard"].map((difficulty) => (
                    <ToggleGroupItem
                      key={difficulty}
                      value={difficulty}
                      aria-label={difficulty}
                    >
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* END DIFFICULTY */}
        <Button type="submit" className="">
          Submit
        </Button>
      </form>
    </Form>
  );
}
