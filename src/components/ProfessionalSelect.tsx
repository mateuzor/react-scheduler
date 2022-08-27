import { Select } from "antd";

function ProfessionalSelect({ label, handleChange }: any) {
  const { Option } = Select;
  return (
    <>
      <strong>{label}</strong>
      <Select
        defaultValue=""
        style={{ width: "100% " }}
        onChange={(professional) => handleChange(professional)}
      >
        <Option value="doctor">Doctor</Option>
        <Option value="assistant">Assistant</Option>
        <Option value="hygenist">Hygenist</Option>
      </Select>
    </>
  );
}

export default ProfessionalSelect;
