"use client"

import { useEffect } from "react"
import { Card, Row, Col, Statistic } from "antd"
import { ShoppingOutlined, DollarOutlined, UserOutlined, LineChartOutlined } from "@ant-design/icons"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { fetchItemsSuccess } from "@/lib/redux/slices/itemsSlice"
import { fetchSalesSuccess } from "@/lib/redux/slices/salesSlice"

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
  { id: "4", itemId: "1", quantity: 1, totalPrice: 100, date: "2023-01-04" },
]

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector((state) => state.items)
  const { sales } = useAppSelector((state) => state.sales)

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    dispatch(fetchItemsSuccess(dummyItems))
    dispatch(fetchSalesSuccess(dummySales))
  }, [dispatch])

  const totalItems = items.length
  const totalStock = items.reduce((acc, item) => acc + item.stock, 0)
  const totalSales = sales.length
  const totalRevenue = sales.reduce((acc, sale) => acc + sale.totalPrice, 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Total Items" value={totalItems} prefix={<ShoppingOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Total Stock" value={totalStock} prefix={<LineChartOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Total Sales" value={totalSales} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Total Revenue" value={totalRevenue} prefix={<DollarOutlined />} precision={2} />
          </Card>
        </Col>
      </Row>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Recent Items" className="h-80">
          <div className="space-y-2">
            {items.slice(0, 5).map((item) => (
              <div key={item.id} className="p-2 border rounded flex justify-between">
                <span>{item.name}</span>
                <span className="font-semibold">${item.price}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Sales" className="h-80">
          <div className="space-y-2">
            {sales.slice(0, 5).map((sale) => (
              <div key={sale.id} className="p-2 border rounded flex justify-between">
                <span>Order #{sale.id}</span>
                <span className="font-semibold">${sale.totalPrice}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

