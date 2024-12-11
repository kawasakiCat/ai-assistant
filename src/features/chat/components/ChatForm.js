// ChatForm.js
import React from "react";
import { useChatFormData } from "../../../hooks/useChatFormData";
import {
  submitMotivationForm,
  submitSelfPromotionForm,
} from "../services/chatService";
import TextArea from "../../../components/common/TextArea/TextArea";
import Button from "../../../components/common/Button/Button";
import Input from "../../../components/common/Input/Input";

export function MotivationForm({ onFormSubmit }) {
  const [formData, updateFormData] = useChatFormData({
    targetIndustry: null,
    targetCompany: null,
    outline: null,
    purpose: null,
    personalBackground: null,
    careerGoals: null,
    companyUnderstanting: null,
    matchingElements: null,
    previouseStatement: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const result = await submitMotivationForm(formData);
      console.log("APIの結果:", result);
      onFormSubmit(result);
    } catch (error) {
      console.error("送信中にエラー", error);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <Input
        type="text"
        label="志望業界"
        name="targetIndustry"
        value={formData.targetIndustry}
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
        required
        helperText="例: 学校法人コア学園、大手企業、外資系など"
      />
      <TextArea
        type="text"
        label="アウトライン"
        name="outline"
        value={formData.outline}
        onChange={handleInputChange}
        required
        helperText="例: 最初に結論を述べて、次に理由を述べて、最後に将来のビジョンを述べたい"
        rows={2}
      />
      <TextArea
        type="text"
        label="目的"
        name="purpose"
        value={formData.purpose}
        onChange={handleInputChange}
        required
        helperText="あなたの志望動機を通して企業に与えたい印象や、焦点を当ててほしい要素など"
        rows={2}
      />
      <TextArea
        type="text"
        label="あなたの背景"
        name="personalBackground"
        value={formData.personalBackground}
        onChange={handleInputChange}
        required
        helperText="あなたの学生時代の専門分野や、インターンシップの経験、資格や技能、興味のある技術や分野など"
        rows={2}
      />
      <TextArea
        type="text"
        label="キャリア志向"
        name="careerGoals"
        value={formData.careerGoals}
        onChange={handleInputChange}
        required
        helperText="将来のキャリアビジョン、この企業・業界で実現したいこと、貢献できる具体的な能力など"
        rows={2}
      />
      <TextArea
        type="text"
        label="企業への理解"
        name="companyUnderstanting"
        value={formData.companyUnderstanting}
        onChange={handleInputChange}
        required
        helperText="企業の事業内容、企業の理念や文化、注目している製品やサービス、企業の社会的意義や将来性、企業の特徴や強みなど"
        rows={2}
      />
      <TextArea
        type="text"
        label="マッチング要素"
        name="matchingElements"
        value={formData.matchingElements}
        onChange={handleInputChange}
        required
        helperText="企業の事業と自身の興味の接点、企業文化と自身の価値観の一致点、なぜこの企業を選んだか、企業に対する具体的な興味や共感点など"
        rows={2}
      />
      <TextArea
        type="text"
        label="過去の志望動機や自己PR"
        name="previouseStatement"
        value={formData.previouseStatement}
        onChange={handleInputChange}
        helperText="過去に作成した文章があれば、より効果的な内容にブラッシュアップ"
        rows={2}
      />
      <Button type="submit">送信</Button>
    </form>
  );
}

export function SelfPromotionForm({ onFormSubmit }) {
  const [formData, updateFormData] = useChatFormData({
    targetIndustry: null,
    targetCompany: null,
    outline: null,
    purpose: null,
    strengths: null,
    studentExperience: null,
    achievements: null,
    personality: null,
    futureGoals: null,
    values: null,
    interests: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await submitSelfPromotionForm(formData);
      console.log("APIの結果:", result);
      onFormSubmit(result);
    } catch (error) {
      console.error("送信中にエラー", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        label="志望業界"
        name="targetIndustry"
        value={formData.targetIndustry}
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
        required
        helperText="例: 学校法人コア学園、大手企業、外資系など"
      />
      <TextArea
        type="text"
        label="アウトライン"
        name="outline"
        value={formData.outline}
        onChange={handleInputChange}
        required
        helperText="例: 最初に強みを述べて、次に実績を紹介し、最後に目標を示したい"
        rows={2}
      />
      <TextArea
        type="text"
        label="目的"
        name="purpose"
        value={formData.purpose}
        onChange={handleInputChange}
        required
        helperText="あなたの志望動機を通して企業に与えたい企業に伝えたい自分の強みや印象など"
        rows={2}
      />
      <TextArea
        type="text"
        label="あなたの強み"
        name="strengths"
        value={formData.strengths}
        onChange={handleInputChange}
        required
        helperText="例: 得意な能力やスキル、専門的な技術や知識"
        rows={2}
      />
      <TextArea
        type="text"
        label="学生時代の経験"
        name="studentExperience"
        value={formData.studentExperience}
        onChange={handleInputChange}
        helperText="例: 学業での成果、サークル・部活動での役割と実績、ボランティア活動、インターンシップから学んだこと"
        rows={2}
      />
      <TextArea
        type="text"
        label="具体的な成果"
        name="achievements"
        value={formData.achievements}
        onChange={handleInputChange}
        helperText="例: 受賞歴、数値化できる実績、リーダーシップを発揮した経験、問題解決した事例、チームでの貢献"
        rows={2}
      />
      <TextArea
        type="text"
        label="パーソナリティ"
        name="personality"
        value={formData.personality}
        onChange={handleInputChange}
        helperText="例: 自分の強みと関係がある性格をピックアップ"
        rows={2}
      />
      <TextArea
        type="text"
        label="今後の目標"
        name="futureGoals"
        value={formData.futureGoals}
        onChange={handleInputChange}
        helperText="例: 自己研鑽の方向性、キャリアで実現したいこと、スキルアップの計画、将来のビジョン"
        rows={2}
      />
      <TextArea
        type="text"
        label="価値観"
        name="values"
        value={formData.values}
        onChange={handleInputChange}
        helperText="「挑戦を恐れない」「チームワークを重視する」など、自分の行動原則やモチベーションの源泉"
        rows={2}
      />
      <TextArea
        type="text"
        label="興味関心"
        name="interests"
        value={formData.interests}
        onChange={handleInputChange}
        helperText="「旅行」「スポーツ」など人柄を感じさせる要素"
        rows={2}
      />
      <Button type="submit" onClick={handleSubmit}>
        送信
      </Button>
    </form>
  );
}
