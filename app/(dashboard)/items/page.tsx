"use client"

import { useEffect, useState } from "react"
import { Table, Button as AntButton, Input, Modal, Form, InputNumber } from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Button } from "@/components/ui/button"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { fetchItemsSuccess, addItem, updateItem, deleteItem } from "@/lib/redux/slices/itemsSlice"

// Dummy data for demonstration
const dummyItems = [
  { id: "1", name: "Product 1", description: "Description 1", price: 100, stock: 20 },
  { id: "2", name: "Product 2", description: "Description 2", price: 200, stock: 15 },
  { id: "3", name: "Product 3", description: "Description 3", price: 150, stock: 30 },
]

export default function Items() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [searchText, setSearchText] = useState("")

  const dispatch = useAppDispatch()
  const { items } = useAppSelector((state) => state.items)

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    dispatch(fetchItemsSuccess(dummyItems))
  }, [dispatch])

  const showModal = (id: string | null = null) => {
    setEditingItem(id)
    if (id) {
      const item = items.find((item) => item.id === id)
      form.setFieldsValue(item)
    } else {
      form.resetFields()
    }
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingItem) {
        dispatch(updateItem({ ...values, id: editingItem }))
      } else {
        // In a real app, you would generate a proper ID
        dispatch(addItem({ ...values, id: Date.now().toString() }))
      }
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteItem(id))
      },
    })
  }

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase()),
  )

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex space-x-2">
          <AntButton icon={<EditOutlined />} onClick={() => showModal(record.id)} type="primary" ghost />
          <AntButton icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Items</h1>
        <Button onClick={() => showModal()} className="flex items-center">
          <PlusOutlined className="mr-2" />
          Add Item
        </Button>
      </div>

      <Input.Search
        placeholder="Search items..."
        onChange={(e) => setSearchText(e.target.value)}
        className="max-w-md mb-4"
      />

      <Table dataSource={filteredItems} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />

      <Modal
        title={editingItem ? "Edit Item" : "Add Item"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <AntButton key="back" onClick={handleCancel}>
            Cancel
          </AntButton>,
          <AntButton key="submit" type="primary" onClick={handleSubmit}>
            {editingItem ? "Update" : "Add"}
          </AntButton>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter the item name" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter the item description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please enter the item price" }]}>
            <InputNumber
              min={0}
              precision={2}
              style={{ width: "100%" }}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true, message: "Please enter the item stock" }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

