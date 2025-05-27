-- ORPHAN CHECK
SELECT COUNT(*)
FROM rental r
LEFT JOIN customer c ON r.customer_id = c.customer_id
WHERE c.customer_id IS NULL;