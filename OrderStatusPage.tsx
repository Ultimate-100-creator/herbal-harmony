import { useParams, Link } from 'react-router-dom';
import type { Order } from './OrdersPage';
import { SvgIcon } from './components/Icon';

const StatusStep: React.FC<{
  title: string;
  date?: string;
  isCompleted: boolean;
  isLast?: boolean;
  isCancelled?: boolean;
}> = ({
  title,
  date,
  isCompleted,
  isLast = false,
  isCancelled = false,
}) => (
  <div className="relative flex items-start">
    {!isLast && (
      <div className="absolute left-4 top-5 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
    )}
    <div className={`relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${isCancelled ? 'bg-red-600' : isCompleted ? 'bg-green-600' : 'bg-gray-300'}`}>
      <SvgIcon icon={isCancelled ? 'close' : 'check'} className="h-5 w-5 text-white" />
    </div>
    <div className="ml-4">
      <h3 className={`font-semibold ${isCompleted || isCancelled ? 'text-gray-900' : 'text-gray-400'}`}>{title}</h3>
      {(isCompleted || isCancelled) && date && <p className="text-sm text-gray-500">{date}</p>}
    </div>
  </div>
);

export const OrderStatusPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Order not found');
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error(error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Loading Status...</h1>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Order Not Found</h1>
        <p>Sorry, we couldn't find an order with that ID.</p>
        <Link to="/track-order" className="text-green-600 hover:underline mt-4 inline-block">
          Try another Order ID
        </Link>
      </main>
    );
  }

  const getStatusDate = (status: Order['status']) => {
    const orderDate = new Date(order.date);
    switch (status) {
      case 'Processing':
        return orderDate.toLocaleDateString();
      case 'Shipped':
        orderDate.setDate(orderDate.getDate() + 1);
        return orderDate.toLocaleDateString();
      case 'Delivered':
        orderDate.setDate(orderDate.getDate() + 3);
        return orderDate.toLocaleDateString();
      default:
        return '';
    }
  };

  const statusLevels: Order['status'][] = ['Processing', 'Shipped', 'Delivered'];
  const isCancelled = order.status === 'Cancelled';
  const currentStatusIndex = statusLevels.indexOf(order.status);

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">Order Status</h1>
          <p className="text-gray-600 mt-2">
            Order #{order.id} placed on {new Date(order.date).toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Tracking Details</h2>
          <div className="space-y-8">
            {isCancelled ? (
              <StatusStep
                title="Cancelled"
                date={getStatusDate('Processing')} // Or a real cancellation date
                isCompleted={true}
                isCancelled={true}
                isLast={true}
              />
            ) : (
              statusLevels.map((status, index) => (
                <StatusStep
                  key={status}
                  title={status}
                  date={getStatusDate(status)}
                  isCompleted={index <= currentStatusIndex}
                  isLast={index === statusLevels.length - 1}
                />
              ))
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/track-order" className="text-green-600 hover:underline">
            Track another order
          </Link>
        </div>
      </div>
    </main>
  );
};