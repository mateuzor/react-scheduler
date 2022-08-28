import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import styles from "./Scheduler.module.css";
import AvailabilityColumn from "./AvailabilityColumn";
import TimeSelect from "./TimeSelect";
import ProfessionalSelect from "./ProfessionalSelect";
import { availabilitiesType } from "./@types/availabilitiesType";

interface OnfinishDatatype {
  professional: string;
  startTime: string;
  endTime: string;
}

function Scheduler() {
  const professionals = ["Doctor", "Assistant", "Hygenist"];
  const workingHours = [9, 10, 11, 12, 13, 14, 15];
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  const [availabilities, setAvailabilities] = useState<availabilitiesType>({
    doctor: {},
    assistant: {},
    hygenist: {},
  });

  function converTimeToTwelveHours(timeValue: string) {
    let time = timeValue.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)?$/) || [
      timeValue,
    ];
    if (time.length > 1) {
      time = time.slice(1);
      time[0] = String(+time[0] % 12 || 12);
    }
    return time.join("");
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    console.log(availabilities);
    const professionalsAvailabilities = JSON.parse(
      localStorage.getItem("professionalAvailabilities")
    );
    console.log(professionalsAvailabilities);
    setAvailabilities(professionalsAvailabilities);
  }, []);

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const onFinish = ({ professional, startTime, endTime }: OnfinishDatatype) => {
    const timeInterval = {
      startTime: startTime,
      endTime: endTime,
    };

    const availabilitiesCopy = availabilities;

    availabilitiesCopy[professional] = timeInterval;

    setAvailabilities(availabilitiesCopy);
    localStorage.setItem(
      "professionalAvailabilities",
      JSON.stringify(availabilitiesCopy)
    );
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <Col className={styles.schedulerContainer}>
      <Row className={styles.buttonRow} justify="end">
        <Button
          onClick={showModal}
          type="primary"
          style={{ background: "#055F5B", borderColor: "white" }}
        >
          ADD AVAILABILITY
        </Button>
      </Row>
      <Row className={styles.professionalTitleRow} gutter={[2, 2]}>
        <>
          <Col
            style={{
              width: "83.5px",
              border: "0.5px solid",
            }}
          >
            <Row
              style={{
                padding: "5px",
                height: "32px",
                backgroundColor: "#F5E0B7",
              }}
            ></Row>
          </Col>
          {professionals.map((professional, index) => {
            return (
              <Col key={index} span={3}>
                <Row className={styles.professionalTitle}>{professional}</Row>
              </Col>
            );
          })}
        </>
      </Row>
      <Row className={styles.timeColumns} gutter={[2, 2]}>
        <Col
          className={styles.ti}
          style={{ border: "0.5px solid", backgroundColor: "#F5E0B7" }}
        >
          {workingHours.map((row, index) => {
            return (
              <Row key={index} className={styles.timeRow}>
                {converTimeToTwelveHours(`${index + workingHours[0]}:00`)}
              </Row>
            );
          })}
        </Col>
        <AvailabilityColumn
          timeInterval={availabilities["doctor"]}
          workingHours={workingHours}
        />
        <AvailabilityColumn
          timeInterval={availabilities["assistant"]}
          workingHours={workingHours}
        />
        <AvailabilityColumn
          timeInterval={availabilities["hygenist"]}
          workingHours={workingHours}
        />
      </Row>

      <Modal
        visible={isModalVisible}
        okText="Save"
        cancelButtonProps={{
          style: { display: "none" },
        }}
        okButtonProps={{
          style: { display: "none" },
        }}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="professional"
            rules={[
              { required: true, message: "Please select a professional!" },
            ]}
          >
            <ProfessionalSelect label="Select a column" />
          </Form.Item>
          <Form.Item
            name="startTime"
            rules={[
              { required: true, message: "Please select start time!" },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (Number(value) > Number(getFieldValue("endTime"))) {
                    return Promise.reject(
                      "end time must be smaller than end time"
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <TimeSelect label="Select a start time" />
          </Form.Item>
          <Form.Item
            name="endTime"
            rules={[
              { required: true, message: "Please select an end time!" },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  console.log(
                    "end time:",
                    value,
                    "start time:",
                    getFieldValue("startTime")
                  );
                  if (Number(value) < Number(getFieldValue("startTime"))) {
                    return Promise.reject(
                      "end time must be greater than start time"
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <TimeSelect label="Select an end time" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Col>
  );
}

export default Scheduler;
