import { Service } from "../../models/Service";
import { AppDataSource } from "../db";

export const staticServicesSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        //Service1 as custom tatoos
        const service1 = new Service();
        service1.serviceName = "Custom tattoos"
        service1.description = "The customers will have the freedom to select unique motifs and designs, completely customize your tattoo experience according to your preferences and tastes."
        await service1.save();

        //Service2 as catalogue tatoos
        const service2 = new Service();
        service2.serviceName = "Catalogue tattoos"
        service2.description = "We offer tattoos based on predefined designs in our catalogue. Customers can choose from a variety of stylish and proven options."
        await service2.save();

        //Service3 as restoration
        const service3 = new Service();
        service3.serviceName = "Restoration and rejuvenation"
        service3.description = "We specialize in the restoration and rejuvenation of existing tattoos. Our experts work to improve and renew old tattoos, restoring their vitality."
        await service3.save();

        //Service4 as piercings and dilators
        const service4 = new Service();
        service4.serviceName = "Piercings and dilators"
        service4.description = "We offer professional services for the placement of piercings and dilators. Our team ensures safe procedures and varied styles to satisfy individual preferences of our clients."
        await service4.save();

        //Service5 as sellings and others
        const service5 = new Service();
        service5.serviceName = "Piercings sellings and other articles"
        service5.description = "In addition to our application services, we offer a selection of piercings and other items related to body art. Customers can purchase quality products for complement your unique style."
        await service5.save();
    } catch (error) {
        console.log(error);
    } finally {
        await AppDataSource.destroy()
    }
  }