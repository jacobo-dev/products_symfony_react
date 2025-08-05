<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use PhpParser\Node\Name;
use PHPUnit\Util\Json;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/products')]
 class ProductApiController extends AbstractController
{
    #[Route('/', name: 'api_products_index', methods:['GET'])]
    public function index(ProductRepository $productRepository): JsonResponse
    {

        $products = $productRepository->findAll();

        $data = array_map(fn($product)=> [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
        ], $products);

        return $this->json($data);
    }

    #[Route('/new', name: 'api_products_create', methods:['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $product = new Product();
        $product->setName($data['name'] ?? '');
        $product->setDescription($data['description'] ?? '');
        $product->setPrice($data['price'] ?? 0);
        
        $em->persist($product);
        $em->flush();
        return $this->json([
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
        ]);
    }

    #[Route('/{id}', name: 'api_products_show', methods:['GET'])]
    public function show(Product $product): JsonResponse
    {
        return $this->json([
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
        ]);
    }

    #[Route('/{id}', name: 'api_products_update', methods:['PUT'])]
    public function update(Request $request, Product $product, EntityManagerInterface $em): JsonResponse
    {
        $data= json_decode($request->getContent(), true);
        
        $product->setName($data['name'] ?? '');
        $product->setDescription($data['description'] ?? '');
        $product->setPrice($data['price'] ?? 0);

        $em->flush();

        return $this->json([
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
        ]);
    }

    #[Route('/{id}', name: 'api_products_delete', methods: ['DELETE'])]
    public function delete(Product $product, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($product);
        $em->flush();

        return $this->json(['status' => 'deleted']);
    }
}
