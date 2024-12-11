import Card from "./components/common/Card/Card";
import Input from "./components/common/Input/Input";
import Button from "./components/common/Button/Button";

const CardExample = () => {
    return (
        <>
            <Card 
             variant="primary"
             size="normal"
             title="サンプル１" >
                variant, sizeをなにも指定しなければこのカードスタイルになります。
                <Input type="text" label="テスト" ></Input>
                <Input type="text" label="テスト" ></Input>
            </Card>

            <Card 
             variant="secondary"
             size="small"
             title="サンプル２" >
                variant="secondary", size="small"に指定するとこのカードスタイルになります。
                <Button>テスト</Button>
            </Card>
        </>
    );
};

export default CardExample;