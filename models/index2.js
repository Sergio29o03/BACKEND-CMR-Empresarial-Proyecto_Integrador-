// Importa todos los modelos
import RequestedProducts, { associate as associateRequestedProducts } from "./models/requestedProductmodel.js";
import Quotations, { associate as associateQuotations } from "./models/Quotationsmodel.js";


// Llama a la función associate() de cada modelo para definir sus relaciones
associateRequestedProducts();
associateQuotations();

// Sincroniza todos los modelos con la base de datos
db.sync();