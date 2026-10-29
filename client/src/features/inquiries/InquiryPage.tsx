import { InquiryForm } from "./InquiryForm";

export function InquiryPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold">Tell us about your project</h1>
      <p className="mt-2 mb-8 text-gray-600">
        Describe what you need in your own words. We'll turn it into a clear project brief.
      </p>
      <InquiryForm />
    </div>
  );
}
