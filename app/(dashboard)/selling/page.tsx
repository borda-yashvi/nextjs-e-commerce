"use client"

import { useEffect, useState } from "react"
import { Table, Card, Form, Select, InputNumber, DatePicker } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { Button } from "@/components/ui/button"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { fetchItemsSuccess } from "@/lib/redux/slices/itemsSlice"
import { fetchSalesSuccess, addSale } from "@/lib/redux/slices/salesSlice"

// Dummy data for demonstration
const dummyItems = [
  { id: "1", name: "Product 1", description: "Description 1", price: 100, stock: 20 },
  { id: "2", name: "Product 2", description: "Description 2", price: 200, stock: 15 },
  { id: "3", name: "Product 3", description: "Description 3", price: 150, stock: 30 },
]

const dummySales = [
  { id: "1", itemId: "1", quantity: 5, totalPrice: 500, date: "2023-01-01" },
  { id: "2", itemId: "2", quantity: 3, totalPrice: 600, date: "2023-01-02" },
  { id: "3", itemId: "3", quantity: 2, totalPrice: 300, date: "2023-01-03" },
]

export default function Selling() {
  const [form] = Form.useForm()
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)

  const dispatch = useAppDispatch()
  const { items } = useAppSelector((state) => state.items)
  const { sales } = useAppSelector((state) => state.sales)

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    dispatch(fetchItemsSuccess(dummyItems))
    dispatch(fetchSalesSuccess(dummySales))
  }, [dispatch])

  const handleItemChange = (value: string) => {
    const item = items.find((item) => item.id === value)
    setSelectedItem(item)
    setQuantity(1)
  }

  const handleQuantityChange = (value: number | null) => {
    if (value !== null) {
      setQuantity(value)
    }
  }

  const handleSale = () => {
    if (!selectedItem) return

    form.validateFields().then((values) => {
      const totalPrice = selectedItem.price * quantity
      const sale = {
        id: Date.now().toString(), // In a real app, you would generate a proper ID
        itemId: selectedItem.id,
        quantity,
        totalPrice,
        date: values.date.format("YYYY-MM-DD"),
      }

      dispatch(addSale(sale))
      form.resetFields()
      setSelectedItem(null)
      setQuantity(1)
    })
  }

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Item",
      key: "item",
      render: (record: any) => {
        const item = items.find((item) => item.id === record.itemId)
        return item ? item.name : "Unknown Item"
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Selling</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="New Sale" className="md:col-span-1">
          <Form form={form} layout="vertical">
            <Form.Item name="itemId" label="Select Item" rules={[{ required: true, message: "Please select an item" }]}>
              <Select
                placeholder="Select an item"
                onChange={handleItemChange}
                options={items.map((item) => ({
                  value: item.id,
                  label: `${item.name} - $${item.price}`,
                }))}
              />
            </Form.Item>

            {selectedItem && (
              <>
                <div className="mb-4">
                  <p>
                    Price: <span className="font-semibold">${selectedItem.price}</span>
                  </p>
                  <p>
                    Available Stock: <span className="font-semibold">{selectedItem.stock}</span>
                  </p>
                </div>

                <Form.Item
                  name="quantity"
                  label="Quantity"
                  rules={[
                    { required: true, message: "Please enter quantity" },
                    {
                      validator: (_, value) =>
                        value <= selectedItem.stock ? Promise.resolve() : Promise.reject(new Error("Not enough stock")),
                    },
                  ]}
                >
                  <InputNumber
                    min={1}
                    max={selectedItem.stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item name="date" label="Date" rules={[{ required: true, message: "Please select a date" }]}>
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                {quantity > 0 && (
                  <div className="mb-4">
                    <p className="font-semibold">Total: ${(selectedItem.price * quantity).toFixed(2)}</p>
                  </div>
                )}
              </>
            )}

            <Button
              onClick={handleSale}
              disabled={!selectedItem || quantity <= 0}
              className="w-full flex items-center justify-center"
            >
              <ShoppingCartOutlined className="mr-2" />
              Complete Sale
            </Button>
          </Form>
        </Card>

        <Card title="Recent Sales" className="md:col-span-2">
          <Table dataSource={sales} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
        </Card>
      </div>
    </div>
  )
}

