import { zodResolver } from "@hookform/resolvers/zod";
import { createInquirySchema, type CreateInquiryInput } from "@scopepilot/shared";
import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { Button } from "../../components/ui/Button";
import { Field } from "../../components/ui/Field";
import { Input, Select, Textarea } from "../../components/ui/FormControls";
import { budgetOptions, companySizeOptions, timelineOptions } from "./options";
import { sampleInquiries } from "./sampleInquiries";
import type { InquiryFormValues } from "./types";

const emptyValues: InquiryFormValues = {
  name: "",
  email: "",
  companyName: "",
  companySize: "",
  problem: "",
  desiredSolution: "",
  budget: "",
  timeline: "",
  existingTools: "",
  websiteUrl: "",
};

export function InquiryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormValues, unknown, CreateInquiryInput>({
    // Cast: the required selects start as "" (not valid yet), which the schema's input type excludes.
    resolver: zodResolver(createInquirySchema) as Resolver<
      InquiryFormValues,
      unknown,
      CreateInquiryInput
    >,
    defaultValues: emptyValues,
  });
  const [sampleIndex, setSampleIndex] = useState(0);

  function fillSample() {
    const sample = sampleInquiries[sampleIndex % sampleInquiries.length];
    if (sample) reset(sample);
    setSampleIndex((i) => i + 1);
  }

  function onSubmit(values: CreateInquiryInput) {
    // Submission to the server comes with the inquiries endpoint.
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="flex items-center justify-between rounded border border-dashed border-gray-300 bg-gray-50 px-4 py-3">
        <p className="text-sm text-gray-600">Demo: fill the form with a realistic example.</p>
        <Button variant="secondary" onClick={fillSample}>
          Try a sample inquiry
        </Button>
      </div>

      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-semibold">About you</legend>
        <Field label="Your name" htmlFor="name" required error={errors.name?.message}>
          <Input id="name" autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Email" htmlFor="email" required error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
        </Field>
        <Field label="Company name" htmlFor="companyName" error={errors.companyName?.message}>
          <Input id="companyName" autoComplete="organization" {...register("companyName")} />
        </Field>
        <Field label="Company size" htmlFor="companySize" error={errors.companySize?.message}>
          <Select id="companySize" {...register("companySize")}>
            <option value="">Select...</option>
            {companySizeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-semibold">What you need</legend>
        <Field
          label="What problem are you trying to solve?"
          htmlFor="problem"
          hint="Describe it in your own words. Rough notes are fine."
          required
          error={errors.problem?.message}
        >
          <Textarea id="problem" rows={6} {...register("problem")} />
        </Field>
        <Field
          label="Do you have a solution in mind?"
          htmlFor="desiredSolution"
          hint="Optional."
          error={errors.desiredSolution?.message}
        >
          <Textarea id="desiredSolution" rows={3} {...register("desiredSolution")} />
        </Field>
        <Field
          label="Tools or systems you use today"
          htmlFor="existingTools"
          hint="Optional."
          error={errors.existingTools?.message}
        >
          <Input id="existingTools" {...register("existingTools")} />
        </Field>
        <Field
          label="Your current website"
          htmlFor="websiteUrl"
          hint="Optional."
          error={errors.websiteUrl?.message}
        >
          <Input id="websiteUrl" type="url" placeholder="https://" {...register("websiteUrl")} />
        </Field>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-semibold">Budget and timing</legend>
        <Field label="Budget" htmlFor="budget" required error={errors.budget?.message}>
          <Select id="budget" {...register("budget")}>
            <option value="">Select...</option>
            {budgetOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Timeline" htmlFor="timeline" required error={errors.timeline?.message}>
          <Select id="timeline" {...register("timeline")}>
            <option value="">Select...</option>
            {timelineOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
      </fieldset>

      <Button type="submit">Submit inquiry</Button>
    </form>
  );
}
