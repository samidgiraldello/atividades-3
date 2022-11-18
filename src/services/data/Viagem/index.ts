import { IViagemData, IViagemForm } from "interfaces/viagem.interface";
import api from "services/api";

class ViagemData {
  index() {
    return api.get<IViagemData[]>('/viagem')
  }
  store(data: IViagemForm) {
    return api.post(`/viagem`, data)
  }
  show(id: number) {
    return api.get<IViagemData>(`/viagem/${id}`)
  }
  update(id: number, data: IViagemForm) {
    return api.put(`/viagem/${id}`, data)
  }
  destroy(id: number) {
    return api.delete(`/viagem/${id}`)
  }
}

export default new ViagemData()
