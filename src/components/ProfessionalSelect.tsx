import { Select } from "antd";

interface SelectProps {
  value?: string;
  label: string;
  onChange?: () => void;
}

function ProfessionalSelect({ value, label, onChange }: SelectProps) {
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
        <Option value="doctor">Doctor</Option>
        <Option value="assistant">Assistant</Option>
        <Option value="hygenist">Hygenist</Option>
      </Select>
    </>
  );
}

export default ProfessionalSelect;
