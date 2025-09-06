USE [TP1]
GO
/****** Object:  StoredProcedure [dbo].[SP_Obtener_Empleados]    Script Date: 05/09/2025 18:19:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
Listar Empleados 

Nombre: dbo.SP_Obtener_Empleados
Descripción: Obtiene la lista de empleados en orden alfabético ascendente por nombre.
Propósito: Proporcionar de manera ordenada la lista completa de empleados. 
*/

ALTER   PROC [dbo].[SP_Obtener_Empleados]
AS
BEGIN
	SET NOCOUNT ON;														-- Evita mensajes de SQL Server como "Filas afectadas"
	SELECT id, Nombre, Salario FROM dbo.Empleado						-- Selecciona los campos id, Nombre y Salario de la tabla Empleado
	ORDER BY Nombre ASC;												-- y ordena los empleados alfabéticamente
    
	SET NOCOUNT OFF;													-- Restaura la configuración para mensajes de filas afectadas
END;