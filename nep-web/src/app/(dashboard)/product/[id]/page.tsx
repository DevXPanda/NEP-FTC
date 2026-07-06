// Product detail — dynamic route for a single product by id.
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <section>
      <h1>Product {id}</h1>
      {/* TODO: product detail */}
    </section>
  );
}
