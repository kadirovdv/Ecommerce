import Product from "./Product";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Button, Col, Row } from "react-bootstrap";

const TabbedProducts = ({ products }) => {
  return (
    <Tabs>
      <TabList className = "container-fluid d-flex justify-content-center">
        <Tab>
          <Button>Sneakers</Button>
        </Tab>
        <Tab>
          <Button>Laptops</Button>
        </Tab>
        <Tab>
          <Button>Cameras</Button>
        </Tab>
      </TabList>

    <TabPanel>
      <Row>
        {products.map((product) => (
          product.category === "Sneakers" && (
            <>
              <Col sm = {12} md = {6} lg = {4} xl = {3} key = {product.name} className = "product-card">
                <Product product = {product} />
              </Col>
            </>
          )
        ))}
      </Row>
    </TabPanel>

    <TabPanel>
     <Row>
      {products.map((product) => (
          product.category === "Laptops" && (
            <>
              <Col sm = {12} md = {6} lg = {4} xl = {3} key = {product.name} className = "product-card">
                  <Product product = {product} />
                </Col>
            </>
          )
        ))}
     </Row>
    </TabPanel>
    <TabPanel>
       <Row>
        {products.map((product) => (
            product.category === "Cameras" && (
              <>
                <Col sm = {12} md = {6} lg = {4} xl = {3} key = {product.name} className = "product-card">
                  <Product product = {product} />
                </Col>
              </>
            )
          ))}
       </Row>
    </TabPanel>
  </Tabs>
  )
}

export default TabbedProducts;