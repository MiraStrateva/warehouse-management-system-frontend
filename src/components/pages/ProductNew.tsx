import PageContent from "../Shared/PageContent";
import ProductForm from "../Products/ProductForm";

const ProductNewPage: React.FC = () => {
    return (
        <PageContent title="Add Product">
          <ProductForm />
        </PageContent>
      );
};

export default ProductNewPage;