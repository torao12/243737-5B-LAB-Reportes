import { query } from '@/lib/db';
import { z } from 'zod';
import { notFound } from 'next/navigation';

const FilterSchema = z.object({
  limit: z.coerce.number().min(1).max(50).default(10),
  offset: z.coerce.number().min(0).default(0),
});

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ReportPage(props: PageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const validated = FilterSchema.parse(searchParams);

  const reportConfig: any = {
    '1': { view: 'view_ventas_categoria', title: 'Ventas por Categoría', kpi: 'ingresos_totales', desc: 'Muestra ingresos y estatus comercial.' },
    '2': { view: 'view_clientes_vip', title: 'Clientes VIP', kpi: 'inversion_total', desc: 'Clientes con mayor volumen de compra.' },
    '3': { view: 'view_ranking_productos', title: 'Ranking de Productos', kpi: 'ingresos', desc: 'Ranking global usando Window Functions.' },
    '4': { view: 'view_stock_alerta', title: 'Alerta de Stock Crítico', kpi: 'stock', desc: 'Uso de CTE para identificar inventario bajo.' },
    '5': { view: 'view_ordenes_activas', title: 'Órdenes Activas', kpi: 'monto_a_cobrar', desc: 'Pedidos pendientes procesados con COALESCE.' },
  };

  const config = reportConfig[params.id];
  if (!config) return notFound();

  try {
    const res = await query(`SELECT * FROM ${config.view} LIMIT $1 OFFSET $2`, [validated.limit, validated.offset]);
    const data = res.rows;
    const kpiValue = data.reduce((acc: number, row: any) => acc + Number(row[config.kpi] || 0), 0);

    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-navy">{config.title}</h1>
        <p className="text-teal mb-6">{config.desc}</p>

        <div className="kpi-card mb-8">
          <p className="text-xs uppercase font-semibold text-teal">Valor Acumulado (KPI)</p>
          <p className="kpi-value">{params.id === '4' ? `${kpiValue} uds` : `$${kpiValue.toLocaleString()}`}</p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-sky-blue">
          <table>
            <thead>
              <tr>
                {data.length > 0 && Object.keys(data[0]).map(key => <th key={key}>{key.replace('_', ' ')}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val: any, j) => <td key={j}>{val?.toString()}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex gap-4">
          <a href={`/reports/${params.id}?offset=${Math.max(0, validated.offset - 10)}`} className="px-4 py-2 bg-navy text-white rounded shadow">Anterior</a>
          <a href={`/reports/${params.id}?offset=${validated.offset + 10}`} className="px-4 py-2 bg-navy text-white rounded shadow">Siguiente</a>
        </div>
      </div>
    );
  } catch (e) {
    return <div className="p-10 text-red-600 font-bold">Error conectando a la base de datos como app_reporter.</div>;
  }
}