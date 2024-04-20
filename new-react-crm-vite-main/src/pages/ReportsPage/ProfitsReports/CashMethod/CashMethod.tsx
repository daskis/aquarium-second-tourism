import {Table} from "antd";
import {DateItem} from "@/pages";
import {formatDataForProfits} from "@/utils/hooks";

const CashMethod = ({data, months}: { data: DateItem }) => {
    if (months.length) {
        const columns = [
            {title: 'Виды учета', dataIndex: 'accountingTypes', key: 'accountingTypes'},
            {title: `${months[2][0][1]} ${months[2][0][0]}`, dataIndex: 'mount_1', key: 'mount_1'},
            {title: `${months[1][0][1]} ${months[1][0][0]}`, dataIndex: 'mount_2', key: 'mount_2'},
            {title: `${months[0][0][1]} ${months[0][0][0]}`, dataIndex: 'mount_3', key: 'mount_3'},
            {title: 'Итого', dataIndex: 'result', key: 'result'},
        ]
        const values = formatDataForProfits(data, "cash")
        console.log(values)
        return (
            <Table columns={columns} dataSource={values}/>
        );
    } else {
        return (
            <div>
                Введите дату
            </div>
        )
    }
};

export default CashMethod;