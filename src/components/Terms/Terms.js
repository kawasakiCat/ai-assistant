import './Terms.css';

//利用規約モーダルウィンドウ
const Terms = ( ) => {
    return (
        <div className="term-content">
            <div className="Term-title">個人情報の取り扱い</div>
            <div>
            当サービスを利用する際に送信される内容は、個人情報を含まない範囲で行われます。
            </div>

            <div className="Term-title">チャット内容の使用</div>
            <div>
            ユーザーが送信したチャット内容は、OpenAIの仕様に基づき、学習に使用される場合がありますが、必ずしも使用されるとは限りません。
            </div>
            
            <div className="Term-title">個人データの保存</div>
            <div>個人のデータはサーバーに保存されません。</div>
            
            <div className="Term-title">免責事項</div>
            <div>
            当サービスを利用して生成された応募書類に関して、書類選考が通らなかった場合でも、当社は一切の責任を負いません。
            </div>
        </div>
    );
};

export default Terms;