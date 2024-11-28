import React from "react";
import { useChatFormData } from "../../../hooks/useChatFormData";
import TextArea from "../../../components/common/TextArea/TextArea";
import Button from "../../../components/common/Button/Button";
import Input from "../../../components/common/Input/Input";

const ChatFormComponent = () => {
  const [formData, updateFormData] = useChatFormData({ name: "", email: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // サーバー送信の例
  };

  return (
    <form onSubmit={handleSubmit}>
			<Input
				type="text"
				label="志望業界"
				name="targetIndustry"
				value={formData.name}
				onChange={handleInputChange}
				required
				helperText="例: 情報通信業"
			/>
			<TextArea
				type="text"
				label="目指すきっかけ"
			/>
      <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      <Button type="submit">送信</Button>
    </form>
  );
};

export default ChatFormComponent;