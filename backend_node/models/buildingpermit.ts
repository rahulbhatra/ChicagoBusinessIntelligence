import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '.';

export class BuildingPermit extends Model<InferAttributes<BuildingPermit>,
InferCreationAttributes<BuildingPermit>> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    declare id: CreationOptional<number>;
    declare buildingPermitId: number;
    declare permitId: number;
    declare permitType: string;
    declare address: string;
    declare zipCode: string;
    declare latitude: string;
    declare longitude: string;
  };
  
BuildingPermit.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  buildingPermitId: DataTypes.BIGINT,
  permitId: DataTypes.BIGINT,
  permitType: DataTypes.STRING,
  address: DataTypes.STRING,
  zipCode: DataTypes.STRING,
  latitude: DataTypes.DOUBLE,
  longitude: DataTypes.DOUBLE
}, {
  sequelize,
  tableName: 'building_permit',
  modelName: 'BuildingPermit',
});