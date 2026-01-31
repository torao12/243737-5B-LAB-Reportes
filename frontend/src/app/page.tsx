import Link from 'next/link';

export default function Dashboard() {
  const reports = [
    { id: 1, name: 'Ventas por Categoría', desc: 'Análisis de rentabilidad y demanda.' },
    { id: 2, name: 'Clientes VIP', desc: 'Usuarios con mayor inversión acumulada.' },
    { id: 3, name: 'Ranking de Productos', desc: 'Posicionamiento global de ventas.' },
    { id: 4, name: 'Stock Crítico', desc: 'Productos con inventario bajo.' },
    { id: 5, name: 'Órdenes Activas', desc: 'Control de pedidos pendientes de entrega.' },
  ];

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-8 text-navy">Dashboard de Reportes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Link href={`/reports/${report.id}`} key={report.id} className="block p-6 bg-white border border-sky-blue rounded-lg shadow hover:bg-beige transition">
            <h5 className="mb-2 text-xl font-bold text-navy">Reporte #{report.id}: {report.name}</h5>
            <p className="text-teal text-sm">{report.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}