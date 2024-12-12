
import { cn } from "@/utils/cn";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  className?: string;
  defaultValue?: string | number;
  disabled?: boolean;
};

const HRInput = ({
  type,
  name,
  placeholder,
  label,
  className,
  defaultValue,
  disabled,
}: TInputProps) => {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, ...field }, fieldState: { error } }) => (
          <>
            <label className="mb-2 block font-medium">{label}</label>
            <input
              {...field}
              value={value}
              type={type}
              disabled={disabled}
              placeholder={placeholder}
              defaultValue={defaultValue}
              className={cn(
                "h-10 rounded-none border w-full px-4 outline-[#198754]  transition duration-200 outline-[1px]",
                className
              )}
            />
            <p className="text-red-500 text-sm my-1">{error?.message}</p>
          </>
        )}
      />
    </div>
  );
};

export default HRInput;
