import PageContent from "../Shared/PageContent";
import ProductList from "../Products/ProductList";

const ProductListPage: React.FC = () => {
    return (
        <PageContent title="Products">
          <ProductList />
        </PageContent>
      );
};

export default ProductListPage;