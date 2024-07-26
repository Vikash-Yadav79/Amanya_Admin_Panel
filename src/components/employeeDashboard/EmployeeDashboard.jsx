import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button, Input as AntInput, Modal, Form as AntForm, Select, notification, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import 'primereact/resources/themes/saga-blue/theme.css';  // Import theme
import 'primereact/resources/primereact.min.css';  // Import PrimeReact core styles
import 'primeicons/primeicons.css';  // Import PrimeIcons
import './EmployeeDashboard.css'; // Assuming you have a CSS file for custom styles

const { Option } = Select;

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [form] = AntForm.useForm(); // Define the form hook
  const [globalFilter, setGlobalFilter] = useState("");

  // Mock fetch employees data
  useEffect(() => {
    // Mock data
    const mockEmployees = [
      { id: 1, name: 'John Doe', mobile_number: '123-456-7890', status: 'Active' },
      { id: 2, name: 'Jane Smith', mobile_number: '987-654-3210', status: 'Inactive' },
    ];
    setEmployees(mockEmployees);
    setLoading(false);
  }, []);

  const addEmployee = (values) => {
    const newEmployee = { ...values, id: employees.length ? Math.max(...employees.map(emp => emp.id)) + 1 : 1 };
    setEmployees([...employees, newEmployee]);
    setIsModalVisible(false);
    notification.success({
      message: 'Employee Added',
      description: 'The employee has been added successfully.',
    });
  };

  const editEmployee = (values) => {
    const updatedEmployee = { ...editingEmployee, ...values };
    setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
    setIsModalVisible(false);
    notification.success({
      message: 'Employee Updated',
      description: 'The employee has been updated successfully.',
    });
  };

  const deleteEmployee = (employeeId) => {
    setEmployees(employees.filter(emp => emp.id !== employeeId));
    notification.success({
      message: 'Employee Deleted',
      description: 'The employee has been deleted successfully.',
    });
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    form.resetFields(); // Reset form fields
    setIsModalVisible(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    form.setFieldsValue(employee); // Set form fields with employee data
    setIsModalVisible(true);
  };

  const handleDeleteEmployee = (employeeId) => {
    deleteEmployee(employeeId);
  };

  const handleModalOk = (values) => {
    if (editingEmployee) {
      editEmployee(values);
    } else {
      addEmployee(values);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleSearch = (e) => {
    setGlobalFilter(e.target.value);
  };

  const header = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
     <Button type="primary" onClick={handleAddEmployee} icon={<PlusOutlined />}>
  Add Employee
</Button>

      <AntInput
        placeholder="Search"
        style={{ width: '200px' }}
        suffix={<SearchOutlined />}
        onChange={handleSearch}
        value={globalFilter}
      />
    </div>
  );

  return (
    <div className="employee-dashboard">
      <DataTable
        value={employees}
        paginator
        showGridlines
        rows={10}
        loading={loading}
        dataKey="id"
        globalFilter={globalFilter}
        header={header}
        emptyMessage="No employees found."
        paginatorPosition="bottom"
        className="p-datatable-customers"
      >
        <Column field="serialNo" header="S.No" style={{ minWidth: '4rem' }} body={(rowData, { rowIndex }) => rowIndex + 1} />
        <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
        <Column field="mobile_number" header="Mobile No" filter filterPlaceholder="Search by mobile" style={{ minWidth: '12rem' }} />
        <Column field="status" header="Status" style={{ minWidth: '12rem' }} />
        <Column
          header="Action"
          body={(rowData) => (
            <div>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEditEmployee(rowData)}
              />
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteEmployee(rowData.id)}
                style={{ marginLeft: '10px' }}
              />
            </div>
          )}
        />
      </DataTable>

      {/* Modal for Add/Edit Employee */}
      <Modal
        title={editingEmployee ? 'Edit Employee' : 'Add Employee'}
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleModalCancel}
        width={1200}  // Increase modal width for better view
        className="employee-modal"
      >
        <AntForm
          form={form}
          initialValues={editingEmployee}
          onFinish={handleModalOk}
          layout="vertical"
        >
          <Row gutter={24}>
            <Col span={8}>
              <AntForm.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter name!' }]}>
                <AntInput placeholder="Enter name" />
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="last_name" label="Last Name" rules={[{ required: true, message: 'Please enter last name!' }]}>
                <AntInput placeholder="Enter last name" />
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="mobile_number" label="Mobile Number" rules={[{ required: true, message: 'Please enter mobile number!' }]}>
                <AntInput placeholder="Enter mobile number" />
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="status" label="Status" rules={[{ required: true, message: 'Please select status!' }]}>
                <Select placeholder="Select status">
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="age" label="Age" rules={[{ required: true, message: 'Please enter age!' }]}>
                <AntInput type="number" placeholder="Enter age" />
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please select gender!' }]}>
                <Select placeholder="Select gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="employee_id" label="Employee ID" rules={[{ required: true, message: 'Please enter employee ID!' }]}>
                <AntInput placeholder="Enter employee ID" />
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="email" label="Email" rules={[{ type: 'email', message: 'Please enter a valid email!' }, { required: true, message: 'Please enter email!' }]}>
                <AntInput placeholder="Enter email" />
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="mobile_number" label="Mobile Number" rules={[{ required: true, message: 'Please enter mobile number!' }]}>
                <AntInput placeholder="Enter mobile number" />
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="marital_status" label="Marital Status" rules={[{ required: true, message: 'Please select marital status!' }]}>
                <Select placeholder="Select marital status">
                  <Option value="single">Single</Option>
                  <Option value="married">Married</Option>
                </Select>
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="qualification" label="Qualification" rules={[{ required: true, message: 'Please select qualification!' }]}>
                <Select placeholder="Select qualification">
                  <Option value="10+2">10+2</Option>
                  <Option value="graduate">Graduate</Option>
                  <Option value="post_grad">Post Graduate</Option>
                </Select>
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="designation" label="Designation" rules={[{ required: true, message: 'Please enter designation!' }]}>
                <AntInput placeholder="Enter designation" />
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="blood_group" label="Blood Group" rules={[{ required: true, message: 'Please enter blood group!' }]}>
                <AntInput placeholder="Enter blood group" />
              </AntForm.Item>
            </Col>
            <Col span={24}>
              <AntForm.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter address!' }]}>
                <AntInput.TextArea rows={4} placeholder="Enter address" />
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="country" label="Country" rules={[{ required: true, message: 'Please enter country!' }]}>
                <AntInput placeholder="Enter country" />
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="state" label="State" rules={[{ required: true, message: 'Please enter state!' }]}>
                <AntInput placeholder="Enter state" />
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="city" label="City" rules={[{ required: true, message: 'Please enter city!' }]}>
                <AntInput placeholder="Enter city" />
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="pincode" label="Pincode" rules={[{ required: true, message: 'Please enter pincode!' }]}>
                <AntInput placeholder="Enter pincode" />
              </AntForm.Item>
            </Col>
            <Col span={24}>
              <AntForm.Item name="bio" label="Bio">
                <AntInput.TextArea rows={2} placeholder="Enter bio" />
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter username!' }]}>
                <AntInput placeholder="Enter username" />
              </AntForm.Item>
            </Col>
            <Col span={8}>
              <AntForm.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter password!' }]}>
                <AntInput.Password placeholder="Enter password" />
              </AntForm.Item>
            </Col>
          </Row>
        </AntForm>
      </Modal>
    </div>
  );
};

export default EmployeeDashboard;
