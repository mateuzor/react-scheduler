import { Select } from "antd";
interface SelectProps {
  value?: string;
  label: string;
  onChange?: () => void;
}

function TimeSelect({ value, label, onChange }: SelectProps) {
  const { Option } = Select;

  return (
    <>
      <strong>{label}</strong>
      <Select
        value={value}
        defaultValue=""
        style={{ width: "100% " }}
        onChange={onChange}
      >
        <Option value="9">9:00 am</Option>
        <Option value="10">10:00 am</Option>
        <Option value="11">11:00 am</Option>
        <Option value="12">12:00 pm</Option>
        <Option value="13">1:00 pm</Option>
        <Option value="14">2:00 pm</Option>
        <Option value="15">3:00 pm</Option>
      </Select>
    </>
  );
}

export default TimeSelect;
