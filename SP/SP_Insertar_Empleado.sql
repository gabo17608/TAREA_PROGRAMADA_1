USE [TP1]
GO
/****** Object:  StoredProcedure [dbo].[SP_Insertar_Empleado]    Script Date: 05/09/2025 17:42:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
Insertar Empleado 

Nombre: dbo.SP_Insertar_Empleado 
Descripción: Inserta un nuevo empleado. Primero valida que no exista otro empleado con el mismo nombre y apellido; si no existe, realiza 
la inserción.
Propósito: Agregar empleados de forma controlada al sistema, evitando nombres duplicados.
*/

ALTER PROC [dbo].[SP_Insertar_Empleado] 
    @Nombre VARCHAR(128) = NULL,   -- Nombre completo del empleado a insertar
    @Salario MONEY = NULL          -- Salario del empleado
AS
BEGIN
    SET NOCOUNT ON;  -- Evita mensajes de filas afectadas

    -- Validación de nombre duplicado
    IF EXISTS(SELECT 1 FROM dbo.Empleado WHERE Nombre = @Nombre)
    BEGIN
        -- Retorna código 0 y mensaje de error
        SELECT 0 AS Codigo, 'ERROR: El nombre del empleado ya existe' AS Mensaje;
        RETURN;
    END;

    -- Inserción del empleado
    INSERT INTO dbo.Empleado (Nombre, Salario) VALUES (@Nombre, @Salario);

    -- Retorna código 1 y mensaje de éxito
    SELECT 1 AS Codigo, 'Empleado registrado exitosamente' AS Mensaje;

    SET NOCOUNT OFF;
END;