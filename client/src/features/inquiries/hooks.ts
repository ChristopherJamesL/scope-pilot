import { useMutation } from "@tanstack/react-query";
import { submitInquiry } from "./api";

export function useSubmitInquiry() {
  return useMutation({
    mutationFn: submitInquiry,
    onSuccess: (data) => {
      console.log("Inquiry submitted successfully:", data);
    },
  });
}
