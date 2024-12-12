import { Controller, useFormContext } from "react-hook-form";

type FileInputProps = {
  name: string;
  label?: string;
  className?: string;
  disabled?: boolean;
};

const HRFileInput = ({ name, label, className, disabled }: FileInputProps) => {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            {label && <label className="mb-2 block font-medium">{label}</label>}
            <input
              type="file"
              disabled={disabled}
              onChange={(e) => onChange(e.target.files)} // Pass FileList to react-hook-form
              className={`h-10 w-full px-4 outline-[#198754] border transition duration-200 outline-[1px] ${className}`}
            />
            {error && (
              <p className="text-red-500 text-sm my-1">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default HRFileInput;
