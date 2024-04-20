import {DateItem} from "@/pages";
import { Graph } from "@ant-design/charts";
import {Table} from "antd";
import {formatDataForProfits} from "@/utils/hooks";

const AccuralMethod = ({data, months} : {data: DateItem}) => {
    if (months.length) {
        const columns = [
            {title: 'Виды учета', dataIndex: 'accountingTypes', key: 'accountingTypes'},
            {title: `${months[2][0][1]} ${months[2][0][0]}`, dataIndex: 'mount_1', key: 'mount_1'},
            {title: `${months[1][0][1]} ${months[1][0][0]}`, dataIndex: 'mount_2', key: 'mount_2'},
            {title: `${months[0][0][1]} ${months[0][0][0]}`, dataIndex: 'mount_3', key: 'mount_3'},
            {title: 'Итого', dataIndex: 'result', key: 'result'},
        ]
        const values = formatDataForProfits(data, "acurral")
        return (
            <Table columns={columns} dataSource={values} scroll={{ x: 1000 }}/>
        );
    } else {
        return (
            <div>
                Введите дату
            </div>
        )
    }

};

export default AccuralMethod;