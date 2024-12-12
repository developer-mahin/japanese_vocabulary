/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, useRef } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormPros = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const HRForm = ({ onSubmit, children, defaultValues, resolver }: TFormPros) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const formConfig: TFormConfig = {
    resolver: undefined,
  };

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const method = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    method.reset();
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <FormProvider {...method}>
      <form ref={formRef} onSubmit={method.handleSubmit(submit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default HRForm;