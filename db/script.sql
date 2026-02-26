-- select * from brands order by brand_id;
-- select * from body_types;
-- select * from color_finishes;
-- select * from colors;
-- select * from fuels;
-- select * from transmissions;
-- select * from cars;

CREATE VIEW getAllCars AS
SELECT
	c.car_id,
    b.name as brand,
    c.model,
    c.year,
    c.doors,
    t.type as transmission,
    c.img_url,
    c.price
FROM cars c
LEFT JOIN transmissions t ON c.transmission_id = t.transmission_id
LEFT JOIN brands b ON c.brand_id = b.brand_id;

CREATE VIEW getYears AS
SELECT 
    ROW_NUMBER() OVER (ORDER BY year) AS id,
    year
FROM (
    SELECT DISTINCT year
    FROM CARS
) AS years
ORDER BY year;

CREATE VIEW getDoors AS
SELECT 
    ROW_NUMBER() OVER (ORDER BY doors) AS id,
    doors
FROM (
    SELECT DISTINCT doors
    FROM CARS
) AS doors
ORDER BY doors;

-- ============================ cars filter
DELIMITER $$
CREATE PROCEDURE filter_cars (
    IN colors VARCHAR(255),          -- e.g. '1,2,3' (Color IDs)
    IN brands VARCHAR(255),          -- e.g. '5,7,9' (Brand IDs)
    IN doors VARCHAR(255),           -- e.g. '2,4'
    IN finishes VARCHAR(255),        -- e.g. '10,11' (Finish IDs)
    IN transmissions VARCHAR(255),   -- e.g. '3,4'
    IN years VARCHAR(255),           -- e.g. '2018,2019,2020'
    IN order_types VARCHAR(20)       -- 'price_asc','price_desc','year_asc','year_desc'
)
BEGIN
    SET @sql = 'SELECT c.*, b.Name AS Brand, col.Name AS Color, f.description AS Finish, t.type AS Transmission
                FROM cars c
                JOIN brands b ON c.Brand_ID = b.Brand_ID
                JOIN colors col ON c.Color_ID = col.Color_ID
                JOIN color_finishes f ON c.Finish_ID = f.Finish_ID
                JOIN transmissions t ON c.Transmission_ID = t.Transmission_ID
                WHERE 1=1';

    -- Dynamic filters by IDs
    IF colors IS NOT NULL AND colors <> '' THEN
        SET @sql = CONCAT(@sql, ' AND c.Color_ID IN (', colors, ')');
    END IF;

    IF brands IS NOT NULL AND brands <> '' THEN
        SET @sql = CONCAT(@sql, ' AND c.Brand_ID IN (', brands, ')');
    END IF;

    IF doors IS NOT NULL AND doors <> '' THEN
        SET @sql = CONCAT(@sql, ' AND c.Doors IN (', doors, ')');
    END IF;

    IF finishes IS NOT NULL AND finishes <> '' THEN
        SET @sql = CONCAT(@sql, ' AND c.Finish_ID IN (', finishes, ')');
    END IF;

    IF transmissions IS NOT NULL AND transmissions <> '' THEN
        SET @sql = CONCAT(@sql, ' AND c.Transmission_ID IN (', transmissions, ')');
    END IF;

    IF years IS NOT NULL AND years <> '' THEN
        SET @sql = CONCAT(@sql, ' AND c.Year IN (', years, ')');
    END IF;

    -- Dynamic ordering
    CASE order_types
        WHEN 'price_asc'  THEN SET @sql = CONCAT(@sql, ' ORDER BY c.Price ASC');
        WHEN 'price_desc' THEN SET @sql = CONCAT(@sql, ' ORDER BY c.Price DESC');
        WHEN 'year_asc'   THEN SET @sql = CONCAT(@sql, ' ORDER BY c.Year ASC');
        WHEN 'year_desc'  THEN SET @sql = CONCAT(@sql, ' ORDER BY c.Year DESC');
        ELSE SET @sql = CONCAT(@sql, ' ORDER BY c.Price ASC'); -- default value
    END CASE;

    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;

-- ======================= cars filter test
call filter_cars("1,2" ,  "1,2,3", "4,2", "3",  "1,2", "2015,2018,2019,2020", "year_desc")