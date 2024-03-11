import { FC, useEffect, useState } from 'react'

import { Pagination } from '../Pagination'
import styles from './Products.module.scss'

import { getIds, getItems } from '../../services/apiService'
import { Product } from '../../services/types'

const Products: FC = () => {
  const [ids, setIds] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState<Product[]>([])

  const fetchIds = async (
    currentPage: number,
    retries: number = 3,
    delay: number = 1000
  ) => {
    try {
      if (!currentPage) {
        return
      }
      setLoading(true)
      const page = (currentPage - 1) * 10

      const res = await getIds(page)

      const length = res.result.length || 0
      const pagesLength = Math.ceil(length / 10)
      setTotalPages(pagesLength)
      setIds(res.result)
    } catch (error) {
      console.error(error)
      if (retries > 0) {
        setTimeout(() => {
          fetchIds(currentPage, retries - 1, delay * 2)
        }, delay)
      }
    }
  }

  const fetchProducts = async (ids: string[]) => {
    try {
      if (!ids.length) {
        return
      }
      const res = await getItems(ids)

      const map = new Map(res.result.map(i => [i.id, i]))
      const uniqueProducts = Array.from(map.values())

      setProducts(uniqueProducts)
      setLoading(false)
    } catch (error) {
      fetchProducts(ids)
      console.error(error)
    }
  }

  useEffect(() => {
    fetchIds(currentPage)
  }, [currentPage])

  useEffect(() => {
    fetchProducts(ids)
  }, [ids])

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Список продуктов</h1>
        {loading ? (
          'Загрузка...'
        ) : (
          <ul className={styles.list}>
            {products.map(product => (
              <li className={styles.item} key={product.id}>
                <p>{product.id}</p>
                <h2>{product.brand}</h2>
                <p>{product.product}</p>
                <span>Цена: {product.price}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}

export { Products }
