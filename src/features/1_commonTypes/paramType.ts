import { IsNotEmpty, IsString} from 'class-validator';


export class ParamType {
  @IsString()
  @IsNotEmpty({message: 'Invalid id'})
  id: string
}