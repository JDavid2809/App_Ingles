import { useState, useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'

interface UseAdminDataOptions {
  endpoint: string
  searchTerm?: string
  currentPage?: number
  limit?: number
  filters?: Record<string, string>
}

interface PaginationInfo {
  page: number
  limit: number
  total: number
  pages: number
}

interface UseAdminDataReturn<T> {
  data: T[]
  loading: boolean
  pagination: PaginationInfo | null
  error: string | null
  refresh: () => Promise<void>
  create: (data: any) => Promise<boolean>
  update: (id: number | string, data: any) => Promise<boolean>
  remove: (id: number | string) => Promise<boolean>
}

export function useAdminData<T = any>({
  endpoint,
  searchTerm = '',
  currentPage = 1,
  limit = 10,
  filters = {}
}: UseAdminDataOptions): UseAdminDataReturn<T> {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const buildQueryParams = () => {
    const params = new URLSearchParams({
      page: currentPage.toString(),
      limit: limit.toString(),
      search: searchTerm,
      ...filters
    })
    return params.toString()
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const queryParams = buildQueryParams()
      const response = await fetch(`${endpoint}?${queryParams}`)
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      
      // Handle different response formats
      if (Array.isArray(result)) {
        setData(result)
        setPagination(null)
      } else if (result.data || result.students || result.teachers || result.courses || result.payments) {
        const dataKey = Object.keys(result).find(key => 
          ['data', 'students', 'teachers', 'courses', 'payments', 'exams'].includes(key)
        )
        setData(dataKey ? result[dataKey] : [])
        setPagination(result.pagination || null)
      } else {
        setData([])
        setPagination(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const create = async (createData: any): Promise<boolean> => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al crear')
      }

      toast({
        title: "Éxito",
        description: "Elemento creado correctamente"
      })
      
      await fetchData()
      return true
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "No se pudo crear el elemento",
        variant: "destructive"
      })
      return false
    }
  }

  const update = async (id: number | string, updateData: any): Promise<boolean> => {
    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al actualizar')
      }

      toast({
        title: "Éxito",
        description: "Elemento actualizado correctamente"
      })
      
      await fetchData()
      return true
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "No se pudo actualizar el elemento",
        variant: "destructive"
      })
      return false
    }
  }

  const remove = async (id: number | string): Promise<boolean> => {
    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al eliminar')
      }

      toast({
        title: "Éxito",
        description: "Elemento eliminado correctamente"
      })
      
      await fetchData()
      return true
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "No se pudo eliminar el elemento",
        variant: "destructive"
      })
      return false
    }
  }

  const refresh = async () => {
    await fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [endpoint, searchTerm, currentPage, JSON.stringify(filters)])

  return {
    data,
    loading,
    pagination,
    error,
    refresh,
    create,
    update,
    remove
  }
}
