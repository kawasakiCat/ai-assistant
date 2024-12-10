import Button from "../components/common/Button/Button";
import Navigation from "../components/Navigation/Navigation";
import Card from "../components/common/Card/Card";
import { Link } from "react-router-dom";
import '../styles/help.css';

const HelpPage = () => {
    return (
        <div className="help-group">
            <Navigation />
            <div>
                <h2>文章生成モード</h2>
                <div>AIを通して志望動機・自己PRの文章を生成できます。<br />
                生成した文章を使用して履歴書作成に活用することが出来ます。</div>
                <Link to="/chat">
                    <Button>
                        文書生成へ
                    </Button>
                </Link>
            </div>
            <div>
                <h2>履歴書作成モード</h2>
                <div>フォームに履歴書情報を入力してExcelデータで作成できます。</div>
                <Link to="/resume">
                    <Button>

                    </Button>
                </Link>
            </div>
            <div>
                <h2>ログイン</h2>
                <div>ログイン時のチャット履歴が保存され、文章生成モード内で履歴の閲覧が可能になります。</div>
                <Link to="/login">
                    <Button>

                    </Button>
                </Link>
            </div>
            <Card title="推し">
                鈴木健矢
            </Card>
            <Card variant="secondary" size="small" title="推し">
                鈴木健矢
            </Card>
            {/* <div>
                <h2>メモ</h2>
                <div></div>
            </div> */}

        </div>
    );
}

export default HelpPage;