CREATE INDEX idx_detalles_producto_id ON orden_detalles(producto_id);

CREATE INDEX idx_ordenes_fecha ON ordenes(created_at);

CREATE INDEX idx_productos_nombre ON productos(nombre);