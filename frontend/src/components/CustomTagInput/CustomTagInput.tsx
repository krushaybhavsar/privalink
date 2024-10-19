import { Tag, TagInput } from "emblor";
import { FieldValues, UseFormReturn } from "react-hook-form";

type CustomTagInputProps = {
  field: FieldValues;
  form: UseFormReturn<any>;
  tags: Tag[];
  setTags: (value: React.SetStateAction<Tag[]>) => void;
  placeholder?: string;
};

const CustomTagInput = (props: CustomTagInputProps) => {
  return (
    <TagInput
      {...props.field}
      placeholder={props.placeholder}
      tags={props.tags}
      styleClasses={{
        inlineTagsContainer:
          "flex flex-wrap gap-2 bg-card border-none p-0 my-2",
        input:
          "w-full bg-card border-[1.75px] border-border rounded-md px-2.5 py-1.5",
        tag: {
          body: "bg-card text-primary border-[1.75px] border-border rounded-md px-2.5 py-1.5",
          closeButton: "text-primary p-0 ml-2 hover:bg-none hover:text-primary",
        },
      }}
      setTags={(newTags) => {
        props.setTags(newTags);
        props.form.setValue("recipients", newTags as [Tag, ...Tag[]]);
      }}
      activeTagIndex={props.tags.length - 1}
      // setActiveTagIndex={(index) => {
      //   props.setTags((tags) =>
      //     tags.map((tag, i) => ({
      //       ...tag,
      //       active: i === index,
      //     }))
      //   );
      // }}
    />
  );
};

export default CustomTagInput;
