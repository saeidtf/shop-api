import { User } from "../../models";
import { City } from "../../models/City";
import { Province } from "../../models/Province";
import { Role } from "../../models/Role";

export const migrate = async () => {
  await Role.bulkCreate([
    { name: "admin", description: "Admin" },
    { name: "user", description: "User" },
  ]);

  await Province.bulkCreate([
    { name: "California" },
    { name: "Texas" },
    { name: "Florida" },        
  ]);

  await City.bulkCreate([
    { name: "Los Angeles", provinceId: 1 },
    { name: "San Diego", provinceId: 1 },
    { name: "San Jose", provinceId: 1 },
    { name: "San Francisco", provinceId: 1 },    
    { name: "Houston", provinceId: 2 },
    { name: "Dallas", provinceId: 2 },
    { name: "Austin", provinceId: 2 },    
    { name: "Miami", provinceId: 3 },
    { name: "Orlando", provinceId: 3 },
    { name: "Tampa", provinceId: 3 },
  ]);

  await User.create({
    name:"saeed",
    surName:"taherifard",
    email:"saeidtf@gmail.com",
    password:"123456",
    phone:"09123456789",
  })

  console.log("Database seeded");
};
