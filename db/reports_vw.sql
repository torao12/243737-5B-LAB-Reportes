CREATE VIEW view_ventas_categoria AS
SELECT 
    c.nombre AS categoria,
    COUNT(DISTINCT p.id) AS total_productos_distintos,
    COALESCE(SUM(od.cantidad), 0) AS unidades_vendidas,
    COALESCE(SUM(od.subtotal), 0) AS ingresos_totales,
    CASE 
        WHEN SUM(od.subtotal) > 1000 THEN 'Alta Rentabilidad'
        WHEN SUM(od.subtotal) BETWEEN 1 AND 1000 THEN 'Rentabilidad Media'
        ELSE 'Sin Ventas'
    END AS estatus_comercial
FROM categorias c
LEFT JOIN productos p ON c.id = p.categoria_id
LEFT JOIN orden_detalles od ON p.id = od.producto_id
GROUP BY c.id, c.nombre;

CREATE VIEW view_clientes_vip AS
SELECT 
    u.nombre AS cliente,
    COUNT(o.id) AS numero_ordenes,
    SUM(o.total) AS inversion_total,
    ROUND((SUM(o.total) / COUNT(o.id))::numeric, 2) AS ticket_promedio
FROM usuarios u
JOIN ordenes o ON u.id = o.usuario_id
GROUP BY u.id, u.nombre
HAVING COUNT(o.id) >= 1 AND SUM(o.total) > 500;

CREATE VIEW view_ranking_productos AS
SELECT 
    p.nombre AS producto,
    c.nombre AS categoria,
    SUM(od.subtotal) AS ingresos,
    RANK() OVER (ORDER BY SUM(od.subtotal) DESC) AS posicion_global
FROM productos p
JOIN categorias c ON p.categoria_id = c.id
JOIN orden_detalles od ON p.id = od.producto_id
GROUP BY p.id, p.nombre, c.nombre;

CREATE VIEW view_stock_alerta AS
WITH inventario_calculado AS (
    SELECT 
        nombre, 
        stock,
        precio,
        (stock * precio) AS valor_inventario
    FROM productos
)
SELECT * FROM inventario_calculado
WHERE stock < 10;

CREATE VIEW view_ordenes_activas AS
SELECT 
    o.id AS folio_orden,
    u.nombre AS nombre_cliente,
    o.status AS estado_actual,
    COALESCE(o.total, 0) AS monto_a_cobrar,
    o.created_at AS fecha_creacion
FROM ordenes o
JOIN usuarios u ON o.usuario_id = u.id
WHERE o.status NOT IN ('entregado', 'cancelado');

