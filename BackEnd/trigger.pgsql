CREATE OR REPLACE FUNCTION registrar_historial_conexion(
  uid INT,
  ip_txt VARCHAR,
  mac_txt VARCHAR,
  evento_txt VARCHAR
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO historial_conexiones(id_usuario, ip, mac, tipo_evento)
  VALUES (uid, ip_txt, mac_txt, evento_txt);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION trigger_historial_entrada()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM registrar_historial_conexion(
    NEW.id_usuario,
    NEW.ip,       -- debes pasar IP y MAC como parte del insert
    NEW.mac,
    'entrada'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_asistencia_entrada
AFTER INSERT ON asistencia
FOR EACH ROW
EXECUTE FUNCTION trigger_historial_entrada();