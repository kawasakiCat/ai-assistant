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
      <Input
				type="text"
				label="志望企業"
				name="targetCompany"
				value={formData.targetCompany}
        onChange={handleInputChange}
				helperText="例: 学校法人コア学園"
			/>
			<TextArea
				type="text"
				label="あなたの背景"
        name="personalBackground"
        value={formData.personalBackground}
        onChange={handleInputChange}
        helperText="あなたの学生時代の専門分野や、インターンシップの経験、資格や技能、興味のある技術や分野など"
        rows={2}
			/>
      <TextArea
				type="text"
				label="キャリア志向"
        name="careerGoals"
        value={formData.careerGoals}
        onChange={handleInputChange}
        helperText="将来のキャリアビジョン、この企業・業界で実現したいこと、貢献できる具体的な能力など"
        rows={2}
			/>
      <TextArea
				type="text"
				label="企業への理解"
        name="companyUnderstanting"
        value={formData.companyUnderstanting}
        onChange={handleInputChange}
        helperText="企業の事業内容、企業の理念や文化、注目している製品やサービス、企業の社会的意義や将来性、企業の特徴や強みなど"
        rows={2}
			/>
      <TextArea
				type="text"
				label="マッチング要素"
        name="matchingElements"
        value={formData.matchingElements}
        onChange={handleInputChange}
        helperText="企業の事業と自身の興味の接点、企業文化と自身の価値観の一致点、なぜこの企業を選んだか、企業に対する具体的な興味や共感点など"
        rows={2}
			/>
      <Button type="submit">送信</Button>
    </form>
  );
};

export default ChatFormComponent;