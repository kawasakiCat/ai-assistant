import { useState } from "react";

export const useChatFormData = (defaultValues) => {
  const [formData, setFormData] = useState(defaultValues);

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return [formData, updateFormData];
};